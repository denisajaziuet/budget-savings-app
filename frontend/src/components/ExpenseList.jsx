import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return (
      <div className="empty-state">
        <h3>Nuk ka ende shpenzime të ruajtura.</h3>
        <p>Shto shpenzimin e parë për të parë listën tënde këtu.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
