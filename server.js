import {createServer, get} from "http"
import path from "path"
import { fileURLToPath } from "url"
import { readFileSync } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const server = createServer((req, res) => {
    switch(req.url){
        case "/":
            let indexHtmlFile = getStaticFile("index.html")
            res.writeHead(200, {"content-type" : "text/html"})
            res.end(indexHtmlFile)
            break
        case "/style.css":
            let styleCssFile = getStaticFile("style.css")
            res.writeHead(200, {"content-type" : "text/css"})
            res.end(styleCssFile)
            break
        case "/script.js":
            let scriptJsFile = getStaticFile("script.js")
            res.writeHead(200, {"content-type" : "application/javascript"})
            res.end(scriptJsFile)
            break
        default:
            res.statusCode = 404 
            res.end("not found")
    }
})





server.listen(3000, () =>console.log("server on"))

function getStaticFile(name){
    let pathToFile = path.join(__dirname, "static", name)
    let bufferFile = readFileSync(pathToFile)
    let data = Buffer.from(bufferFile)
    return data
}