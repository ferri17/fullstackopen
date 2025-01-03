import { useState, useEffect } from 'react';
import personSerivce from './services/persons';

const Persons = ({ persons, onDelete }) => {
	return (
		<ul>
			{persons.map((person) => (
				<li key={person.name}>
					<span>
						{person.name} {person.number}
					</span>
					<button onClick={() => onDelete(person.name, person.id)}>Delete</button>
				</li>
			))}
		</ul>
	);
};

const Input = ({ onChangeInput, newInput, textInput }) => {
	return (
		<>
			<label>{textInput}</label>
			<input onChange={onChangeInput} value={newInput} />
		</>
	);
};

const PersonForm = ({ onSubmit, inputs, filter }) => {
	return (
		<>
			<h2>Filter</h2>
			<div>
				<Input onChangeInput={filter.onChangeInput} newInput={filter.newInput} textInput={filter.textInput} />
			</div>
			<h2>Add new contact</h2>
			{
				<form onSubmit={onSubmit}>
					{inputs.map((input, i) => (
						<div key={i}>
							<Input
								onChangeInput={input.onChangeInput}
								newInput={input.newInput}
								textInput={input.textInput}
							/>
						</div>
					))}
					<div>
						<button type="submit">add</button>
					</div>
				</form>
			}
		</>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');

	useEffect(() => {
		personSerivce
			.getAll()
			.then((personList) => setPersons(personList))
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const onChangeInputName = (event) => {
		setNewName(event.target.value);
	};

	const onChangeInputNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const onChangeFilter = (event) => {
		setNewFilter(event.target.value);
	};

	const addContact = (event) => {
		event.preventDefault();

		const newPerson = { name: newName, number: newNumber };
		const existingPerson = persons.find((person) => (person.name === newPerson.name ? person : undefined));

		if (existingPerson !== undefined) {
			if (
				window.confirm(
					`${existingPerson.name} is already added to the phonebook, replace the old number with the new one?`
				)
			) {
				personSerivce
					.update(existingPerson.id, newPerson)
					.then((data) => {
						setPersons(
							persons.map((p) => (p.id === existingPerson.id ? { ...p, number: newPerson.number } : p))
						);
						console.log(`contact updated ${data}`);
					})
					.catch((error) => console.log(error));
			}
		} else {
			personSerivce
				.create(newPerson)
				.then((response) => {
					setPersons(persons.concat(response));
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setNewName('');
		setNewNumber('');
	};

	const deletePersonButton = (personName, id) => {
		if (window.confirm(`Do you really want to delete ${personName} from your phonebook?`)) {
			personSerivce
				.deletePerson(id)
				.then((response) => {
					setPersons(persons.filter((p) => p.id !== response.id));
					console.log(response);
				})
				.catch((error) => console.log(error));
		}
	};

	const displayContact = (() => {
		if (!newFilter.length) return persons;
		return persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));
	})();

	return (
		<div>
			<h1>Phonebook</h1>
			<PersonForm
				onSubmit={addContact}
				filter={{
					onChangeInput: onChangeFilter,
					newInput: newFilter,
					textInput: 'Filter:',
				}}
				inputs={[
					{
						onChangeInput: onChangeInputName,
						newInput: newName,
						textInput: 'Name:',
					},
					{
						onChangeInput: onChangeInputNumber,
						newInput: newNumber,
						textInput: 'Number:',
					},
				]}
			/>
			<h2>Numbers</h2>
			<Persons persons={displayContact} onDelete={deletePersonButton} />
		</div>
	);
};

export default App;
