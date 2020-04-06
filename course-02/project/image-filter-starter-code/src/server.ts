import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get( "/filteredimage", async ( req, res ) => {
    let{image_url} = req.query;
    if(!image_url)
    {
      res.status(400).send('Querty string missing');
    }
    
   const promisedPath = filterImageFromURL(image_url)
   promisedPath.catch(err =>{

    console.log('An error occured while trying to read the file');
   });
   promisedPath.then(function(filteredpath) { 
      res.status(200).sendFile(filteredpath);

      res.on('close', () =>
      { 
        let tempDir = __dirname +'/util/tmp'
        
       fs.readdir(tempDir, function(err,files) {

        if(err)
        {
          console.log('Could not read the directory'+ tempDir);
        }
        const fullPathFileArray : Array<string> = [];
        files.forEach(function(file,index)
        {
            fullPathFileArray.push(path.join(tempDir,file))
        })
        deleteLocalFiles(fullPathFileArray);
       });
          

      });
    })
    .catch(error => {
      res.status(400).send('Could not reach Image URL');
    });

 
  } );


  
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();