import exspress, {Request,Response} from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = exspress()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000





const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
app.use(exspress.static("mondaylesson-01"))
app.use('/',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname + 'mondaylesson-01/index.html'))
    }

    )

app.get('/videos',(req:Request,res: Response)=>{

    res.send(videos)

})

app.get('/videos/:videoId',(req:Request,res:Response)=>{
    const id= +req.params.videoId
    const video = videos.find(v=>v.id===id)
    if(!video){
        res.sendStatus(404)
    }else {
        res.json(video)
    }

    })



app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})
app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const index = videos.findIndex(v=> v.id === id)
    if ( index === -1){
        res.send(404)
    }else {
        videos.splice(index,1)
        res.sendStatus(204)
    }

})
app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video=videos.find(v => v.id === id)

    if (!video){
        res.sendStatus(404)
    } else {
        video.title = req.body.title
        res.sendStatus(204)
    }
})

app.listen(port,()=>{
    console.log('Example app listen on '+port)
})
