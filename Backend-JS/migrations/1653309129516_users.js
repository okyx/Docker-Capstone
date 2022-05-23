/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(53)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(255)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    nama: {
      type: 'VARCHAR(255)',
      notNull:false,
    },
    tanggallahir: {
      type: 'date',
      notNull:false,
    },
    jeniskelamin: {
      type: 'boolean',
      notNull:false,
    },
    berat: {
      type: 'integer',
      notNull:false,
    },
    tinggi: {
      type: 'integer',
      notNull:false,
    },
    olahraga: {
      type: 'integer',
      notNull:false,
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('users');
};