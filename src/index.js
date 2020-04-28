import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';

const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikipedia Commons',
		books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi'],
	},
];

const state = {
	turnData: {
		//highlight: ''
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
		} */
		author: authors[0],
		books: authors[0].books,
	},
};

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer);
	state.highlight = isCorrect ? 'correct' : 'wrong';
	render();
}

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
		</React.StrictMode>,
		document.getElementById('root')
	);
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
