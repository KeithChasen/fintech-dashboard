import React, { useActionState, useOptimistic } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';

export function TransactionForm() {
	const addTransaction = useTransactionStore(state => state.addTransaction);

	const [error, formAction, isPending] = useActionState(
		async (prevState: any, formData: FormData) => {
			const title = formData.get('title') as string;
			const amount = Number(formData.get('amount'));

			if (!title || amount <= 0) return 'Invalid data';

			try {
				await addTransaction({ title, amount, type: 'expense' });
				return null;
			} catch (e) {
				return 'Server error';
			}
		},
		null
	);

	return (
		<form action={formAction} className='form-style'>
			<h3>New transaction</h3>
			<input type='text' name='title' placeholder='Title' required />
			<input type='number' name='amount' placeholder='Amount' required />

			<button type='submit' disabled={isPending}>
				{isPending ? 'Sending...' : 'Send'}
			</button>

			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}
