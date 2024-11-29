import { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <ul>
        {persons.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
  )
}

const Input = ({onChangeInput, newInput, textInput}) => {
  console.log(onChangeInput.onChangeFilter, "hi")
  return (
    <>
      <label>{textInput}</label>
      <input onChange={onChangeInput} value={newInput} />
    </>
  )
}

const PersonForm = ({onSubmit, inputs, filter}) => {
  console.log('filterrrr', filter)
  return (
    
    <>
      <div>
        <Input onChangeInput={filter.onChangeInput} newInput={filter.newInput} textInput={filter.textInput}/>
      </div>
      {<form onSubmit={onSubmit}>
        {inputs.map( (input, i) => (
            <div key={i}>
              <Input onChangeInput={input.onChangeInput} newInput={input.newInput} textInput={input.textInput}/>
            </div>
        ))}
        <div>
          <button type="submit">add</button>
        </div>
      </form>}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const onChangeInputName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newPerson.name) ? newPerson.name : undefined
   
    if (existingPerson !== undefined) {
      alert(`${existingPerson} is already added to the phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const displayContact = (() => {
    if (!newFilter.length)
      return (persons)
    return (persons.filter( person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
  })()

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        onSubmit={addContact}
        filter= { {onChangeInput: onChangeFilter, newInput: newFilter, textInput: "Filter:"} }
        inputs={ [
                    {onChangeInput: onChangeInputName, newInput: newName, textInput: "Name:"}, 
                    {onChangeInput: onChangeInputNumber, newInput: newNumber, textInput: "Number:"} 
                  ] }
      />
      <h2>Numbers</h2>
      <Persons persons={displayContact} />
    </div>
  )
}

export default App