import { useTransactionStore } from '../store/useTransactionStore';

export function Transactions() {
	const { transactions } = useTransactionStore();
	return (
		<>
			<h1>Transactions</h1>
			<table>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Amount</th>
				</tr>
				<tbody>
					{transactions.map(tr => (
						<tr>
							<td>{tr.id}</td>
							<td>{tr.title}</td>
							<td>{tr.amount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
