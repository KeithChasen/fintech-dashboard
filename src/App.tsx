import './App.css';
import { TransactionForm } from './components/TransactionForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Transactions } from './components/Transactions';
import { Layout } from './components/Layout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Transactions />} />
					<Route path='/create' element={<TransactionForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
