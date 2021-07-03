import React, { useEffect, useState } from 'react'
import personsService from './services/persons'
import AddNewPersonForm from './components/AddNewPersonsForm'

const PersonEntry = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    <button onClick={deletePerson}>delete</button>
    </p>
)

const SearchFilter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={onFilterChange} />
  </div>
)

const Persons = ({ persons, deletePerson }) => (
    <div>
      {persons.map(p => 
        <PersonEntry 
        key={p.id} 
        person={p} 
        deletePerson={() => deletePerson(p.id)}/>)}
    </div>
  )

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('getAll persons promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  console.log('rendering', persons.length, 'persons')

  const shownPersons = filter === ''  
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .createPerson(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNawNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person)
        .then(person => {
          console.log(person)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>Add a new contact</h3>
      <AddNewPersonForm 
        onSubmit={addNewPerson}
        nameInput={newName}
        onNameChange={handleNawNameChange}
        numberInput={newNumber}
        onNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} deletePerson={(id) => deletePerson(id)}/>
    </div>
  )
}

export default App
