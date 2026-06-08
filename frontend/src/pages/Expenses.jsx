import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../store/apis/expenseApi';
import Spinner from '../components/Spinner';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatCard from '../components/StatCard';
import { formatCurrency } from '../utils/format';

const Expenses = () => {
  const { data: expenses = [], isLoading, isError, error } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  const [editingExpense, setEditingExpense] = useState(null);

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );

  const countExpenses = expenses.length;
  const averageExpense = countExpenses ? totalExpenses / countExpenses : 0;
  const biggestExpense = expenses.reduce(
    (max, item) => (Number(item.amount || 0) > Number(max.amount || 0) ? item : max),
    expenses[0] || null
  );

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni i sigurt që doni ta fshini këtë shpenzim?')) return;

    try {
      await deleteExpense(id).unwrap();
      toast.success('Shpenzimi u fshi me sukses!');
      if (editingExpense?._id === id) {
        setEditingExpense(null);
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Fshirja e shpenzimit dështoi');
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <section className="page container">
        <div className="panel-card">
          <h2>Gabim gjatë ngarkimit</h2>
          <p>{error?.data?.message || 'Nuk u arrit të ngarkohen shpenzimet.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Menaxhimi</p>
          <h1>Shpenzimet e mia</h1>
          <p>Këtu mund të shtosh, përditësosh dhe fshish shpenzimet.</p>
        </div>

        <div className="total-pill">
          Totali i filtruar: <strong>{formatCurrency(totalExpenses)}</strong>
        </div>
      </div>

      <ExpenseForm
        editingExpense={editingExpense}
        onDone={() => setEditingExpense(null)}
        onCancelEdit={() => setEditingExpense(null)}
      />

      <div className="stats-grid stats-grid-3">
        <StatCard
          title="Totali"
          value={formatCurrency(totalExpenses)}
          hint="Shuma totale"
        />
        <StatCard
          title="Numri i shpenzimeve"
          value={countExpenses}
          hint="Të gjitha regjistrimet"
        />
        <StatCard
          title="Mesatarja"
          value={formatCurrency(averageExpense)}
          hint="Mesatare për shpenzim"
        />
      </div>

      <section className="panel-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lista</p>
            <h2>Shpenzimet e regjistruara</h2>
          </div>

          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setEditingExpense(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Shto të re
          </button>
        </div>

        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {biggestExpense ? (
          <div className="highlight-row">
            <span>Shpenzimi më i madh:</span>
            <strong>
              {biggestExpense.description} — {formatCurrency(biggestExpense.amount)}
            </strong>
          </div>
        ) : null}
      </section>
    </section>
  );
};

export default Expenses;