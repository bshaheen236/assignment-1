const fs=require("fs"); //to add file handing
const http=require("http"); //to add request
const PORT=5544;

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        // res.write('<html><body><h2>Assignment sucessfully created...!</h2></body> </html>');
        res.write("<html><head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'></head><body class='text-center'><h1>Server Is Created!</h1><a href='createfile' class='btn btn-primary'  role='button'> Create File </a> &nbsp<a href='readdata' class='btn btn-primary' role='button'> Read File</a>          <a href='append' class='btn btn-primary'  role='button'>Update File</a>          <a href='deletefile' class='btn btn-primary'  role='button' >Delete File</a><script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' integrity='sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM' crossorigin='anonymous'></script></body></html>")
        res.end();
    }
    //this is for creating file
    else if(req.url=="/createfile"){
        if(fs.existsSync("assign.txt")){
            res.end('<html><body><h2>Oh noo...your file is alreay exist (-_-)</h2></body></html>');
        }
        else{
            fs.writeFile('assign.txt',"<html><body><h2>Welcome to my assignment page! </h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta sint, illo distinctio inventore tempore aliquam quia architecto corrupti laboriosam nesciunt ducimus, nihil eius accusantium? Unde blanditiis sequi odit laborum.</p> </body> </html>",(err)=>{
                if(err) throw err
                else res.end('<html><body><h1>Congress...Code is working properly !</h1><h2>Your file has been created! </h2> </body> </html>');
            })
        }
    }
    //this is for reading file
    else if(req.url=="/readfile"){
        if(fs.existsSync("assign.txt")){
            let data=fs.readFileSync("assign.txt");
            res.end(data.toString());
        }
        else{
            //res.end("File Is Not Exists");
        res.write('<html><body><h2>Oops....File Is Not Exists</h2></body></html>');
        res.end()
        }

    }
    //this is for reading html file which is already created
    else if(req.url=="/readhtmlfile"){
        if(fs.existsSync("link.html")){
            let data=fs.readFileSync("link.html");
            res.end(data.toString());
        }
        else{
            res.end('<html><body><h2>Oops....File Is Not Exists</h2></body></html>');
        }

    }
    //this is for append in created file
    else if (req.url === "/appendfile") {
        if(fs.existsSync("assign.txt")){
            fs.appendFile("assign.txt", "And The File Is Updated...!!!", (err) => {
                if (err) throw err;
                else res.end('<html><body><h2>Good...Your data is sucessfully updated !</h2></body></html>') 
            })
        }
        else{
            res.end('<html><body><h2>File Is Not Exists</h2></body></html>');
        }

    }  
    //this is for add in created html file
    else if (req.url === "/appendhtmlfile") {
        if(fs.existsSync("link.html")){
            fs.appendFile("link.html", '<h2><a href="./assign.txt">Created assignment file link</a>', (err)=>{
                if (err) throw err;
                else res.end('<html><body><h2>And the file is peacefully updated !</h2></body></html>') 
            })
        }
        else{
            res.end('<html><body><h2>File Is Not Exists</h2></body></html>');
        }

    }   
    //this is for delelete the file
    else if(req.url=="/deletefile"){
        if(fs.existsSync("assign.txt")){
            fs.unlink("assign.txt",(err)=>{
                if(err) throw err
                else res.end('<html><body><h1>Well done...</h1><h2>your file has been successfully deleted !</h2></body></html>')
            })
        }
        else{
            res.end('<html><body><h2>Oops...File Is Not Exists anymore!</h2></body></html>');
        }
    }
    else{
        res.end('<html><body><h2>Oh noo you typed (-_-) Invalid URL</h2></body></html>')
        }
    })
    //this is for rap the server
    server.listen(PORT,()=>{
        console.log(`Server work on port ${PORT}`)
    })
