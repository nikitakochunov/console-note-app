const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

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
  const notes = await getNotes()

  const newNotes = notes.filter((note) => note.id !== id)

  if (newNotes.length === notes.length) {
    console.log(chalk.yellow.inverse('Note ' + id + ' does not exist'))
    return
  }

  await fs.writeFile('./db.json', JSON.stringify(newNotes))

  console.log(chalk.green.inverse('Note ' + id + ' was removed'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.blue.inverse('List of notes'))
  notes.forEach((note) => {
    console.log(chalk.blue(note.id + ':', note.title))
  })
}

module.exports = {
  addNote,
  removeNote,
  printNotes,
}
