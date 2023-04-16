const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { log } = require('console')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await fs.writeFile('./db.json', JSON.stringify(notes))
  console.log(chalk.green.inverse('Note was added!'))
}

async function removeNote(id) {
  const notes = require('./db.json')

  const newNotes = notes.filter((note) => note.id !== id)

  await fs.writeFile('./db.json', JSON.stringify(newNotes))
  console.log(`Note with id=${id} has been removed`)
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })

  if (!notes) {
    return []
  }

  return JSON.parse(notes)
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.blue.inverse('List of notes'))
  notes.forEach((note, index) => {
    console.log(chalk.blue(index + 1 + ':', note.title))
  })
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  printNotes,
}
