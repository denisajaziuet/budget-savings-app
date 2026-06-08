import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatCurrency, formatDateTime } from '../utils/format';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <article className="expense-item">
      <div className="expense-item-main">
        <div>
          <p className="expense-date">{formatDateTime(expense.createdAt)}</p>
          <h4 className="expense-description">{expense.description}</h4>
        </div>

        <div className="expense-meta">
          <span className="badge">{expense.category}</span>
          <strong className="expense-amount">
            {formatCurrency(expense.amount)}
          </strong>
        </div>
      </div>

      <div className="expense-actions">
        <button className="icon-btn" onClick={() => onEdit(expense)} title="Përditëso">
          <FiEdit2 />
        </button>
        <button className="icon-btn danger" onClick={() => onDelete(expense._id)} title="Fshi">
          <FiTrash2 />
        </button>
      </div>
    </article>
  );
};

export default ExpenseItem;
