import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
import { shuffle, sample } from 'underscore';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm.js';
import * as serviceWorker from './serviceWorker';

const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikipedia Commons',
		books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi'],
	},
	{
		name: 'J.K. Rowling',
		imageUrl: 'images/authors/jkrowling.jpg',
		imageSource: 'Wikipedia Commons',
		books: ['The Half-Blood Prince'],
	},
	{
		name: 'William Shakespeare',
		imageUrl: 'images/authors/williamshakespeare.jpg',
		imageSource: 'Wikipedia Commons',
		books: ['Macbeth', 'Hamlet', 'King Lear'],
	},
	{
		name: 'Stephen King',
		imageUrl: 'images/authors/stephenking.jpg',
		imageSource: 'Wikipedia Commons',
		books: ['IT', 'Doctor Sleep', 'The Shining'],
	},
];

const state = {
	turnData: getTurnData(authors),
	highlight: '',
};
// getTurnData(authors)
/* make function getTurnData(authors){
			const allBooks = authors.reduce(function(p,c,i){
				return p.concat(c.books);
			}, []);
			//  npm install underscore, import shuffle,sample
			const fourRandomBooks= shuffle(allBooks).slice(0,4);
			const answer = sample(fourRandomBooks)
			
			return {
				books: fourRandomBooks,
				author: authors.find((author) => author.books.some((title) => title === answer))
			}
		}
		} 
		turnData: {
			author: authors[0],
			books: authors[0].books,
		}
		*/

function getTurnData(authors) {
	const allBooks = authors.reduce(function (p, c, i) {
		return p.concat(c.books);
	}, []);
	//  npm install underscore, import shuffle,sample
	const fourRandomBooks = shuffle(allBooks).slice(0, 4);
	const answer = sample(fourRandomBooks);

	return {
		books: fourRandomBooks,
		author: authors.find((author) =>
			author.books.some((title) => title === answer)
		),
	};
}

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer);
	state.highlight = isCorrect ? 'correct' : 'wrong';
	render();
}

function App() {
	return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}

const AuthorWrapper = withRouter(({ history }) => (
	<AddAuthorForm
		onAddAuthor={(author) => {
			authors.push(author);
			history.push('/');
		}}
	/>
));

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<React.Fragment>
					<Route exact path="/" component={App} />
					<Route path="/add" component={AuthorWrapper} />
				</React.Fragment>
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('root')
	);
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
