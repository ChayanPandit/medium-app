import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from "hono/jsx"

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()

  
blogRouter.use(async (c,next)=>{
    const authHeader = c.req.header("authorization") || ""

    if(!authHeader){
        c.status(401)
        return c.json({
            message: "unauthorized"
        })
    }
    const user = await verify(authHeader, c.env.JWT_SECRET)

    if(user){
        c.set("userId", String(user.id))
        await next()
    } else {
        c.status(403)
        return c.json({
            message: "You are not logged in!"
        })
    }
})

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    
    const body = await c.req.json()
    const userId = c.get("userId")

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,  
            authorId: userId
        }
    })

    return c.json(blog)
})

blogRouter.put('/', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const userId = c.get("userId")

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,  
            authorId: userId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.get('/all', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        blogs 
    })        

})
  

blogRouter.get('/:id', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const id = await c.req.param("id")

    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })        
    } catch(e){
        c.status(411)
        return c.json({
            message: "error while fetching blog"
        })
    }

})
  
