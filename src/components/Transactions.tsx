import { useTransactionStore } from '../store/useTransactionStore';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function Transactions() {
	const { transactions } = useTransactionStore();
	// parent container which has to has scroll
	const parentRef = useRef<HTMLDivElement>(null);

	const ITEM_SIZE = 40;
	const OVERSCAN = 5;

	const rowVirtualizer = useVirtualizer({
		count: transactions.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => ITEM_SIZE, //size of one item
		overscan: OVERSCAN, // how many rows render outside of visible zone
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

	const atEnd = rowVirtualizer.isAtEnd();

	const startRange = Math.ceil(rowVirtualizer.scrollOffset / ITEM_SIZE);
	const endRange =
		virtualItems.length > 0
			? virtualItems[virtualItems.length - 1].index - (atEnd ? 0 : 5)
			: 0;

	return (
		<>
			<h1>Transactions {transactions.length}</h1>
			<button onClick={() => rowVirtualizer.scrollToEnd()}>END</button>
			<button onClick={() => rowVirtualizer.scrollToIndex(0)}>TOP</button>
			Transactions: {startRange} - {endRange}
			<div
				ref={parentRef}
				style={{
					height: '400px',
					width: '100%',
					overflowY: 'auto',
					border: '1px solid #ccc',
				}}
			>
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative',
					}}
				>
					{rowVirtualizer.getVirtualItems().map(virtualRow => {
						const tr = transactions[virtualRow.index];

						return (
							<div
								key={virtualRow.key}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${virtualRow.size}px`,
									transform: `translateY(${virtualRow.start}px)`,
									display: 'flex',
									alignItems: 'center',
									borderBottom: '1px solid #eee',
									padding: '0 10px',
									boxSizing: 'border-box',
								}}
							>
								<>
									<div style={{ flex: 1 }}>{tr.id}</div>
									<div style={{ flex: 2 }}>{tr.title}</div>
									<div
										style={{
											flex: 1,
											color: tr.type === 'income' ? 'green' : 'red',
										}}
									>
										{tr.type === 'income' ? '+' : '-'}${tr.amount}
									</div>
								</>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
