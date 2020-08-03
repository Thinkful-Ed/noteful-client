'use strict';

const foldersService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },

  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => rows[0]);
  },

  getById(knex, id) {
    return knex
      .from('folders')
      .select('*')
      .where('id', id).first();
  },

  deleteFolder(knex, id) {
    return knex('folders')
      .where({ id })
      .delete();
  },

  updateFolder(knex, id, newName) {
    return knex('folders')
      .where({id })
      .update(newName);
  },
  getFolderNotes(knex,id){
    return knex('notes')
      .where({folder_id: id});
  }
};

module.exports = foldersService;