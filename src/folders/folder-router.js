'use strict';

const express = require('express');

const folderRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger');
const foldersService = require('./foldersService');
const xss = require('xss');

const serializeFolder = folder => ({
  id: folder.id,
  name: xss(folder.name)
});

const serializeNote = note => ({
  ...note,
  name: xss(note.name),
  content: xss(note.content)
});

folderRouter
  .route('/api/folders')
  .get((req,res,next) => {
    const knexInstance = req.app.get('db');
    foldersService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders.map(folder => serializeFolder(folder)));
      })
      .catch(next);
  })
  .post(bodyParser, (req,res,next) =>{
    const {name} = req.body;
    const newFolder = { name};
    foldersService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res
          .status(201)
          .location(req.originalUrl +`/${folder.id}`)
          .json(serializeFolder(folder));
      })
      .catch(next);
  });
folderRouter  
  .route('/api/folder/:id')
  .all((req,res,next)=>{
    foldersService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(folder =>{
        if (!folder) {
          return res.status(404).json({
            error: { message: 'Folder doesn\'t exist' }
          });
        }
        res.folder = folder;
        next();
      })
      .catch(next);
  })
  .get((req,res,next) => {
    const knexInstance = req.app.get('db');
    foldersService.getFolderNotes(knexInstance, req.params.id)
      .then((notes)=>{
        res.json(notes.map(note=>serializeNote(note)));
      })
      .catch(next);
  })
  .delete((req,res,next)=>{
    const { id } = req.params;
    const knexInstance = req.app.get('db');
    foldersService.deleteFolder(knexInstance,id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { name} = req.body;
    const folderToUpdate = { name};

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'request body must contain \'name\''
        }
      });
    }

    foldersService.updateFolder(
      req.app.get('db'),
      req.params.id,
      folderToUpdate
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

  module.exports = folderRouter;
  