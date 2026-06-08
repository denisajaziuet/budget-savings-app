import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from '../store/apis/expenseApi';
import { expenseCategories } from '../constants/categories';
import { toInputDateValue } from '../utils/format';

const emptyForm = {
  description: '',
  amount: '',
  category: 'Ushqim',
  date: new Date().toISOString().split('T')[0],
};

const ExpenseForm = ({ editingExpense, onDone, onCancelEdit }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [createExpense, { isLoading: creating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: updating }] = useUpdateExpenseMutation();

  const isEditing = Boolean(editingExpense);
  const isLoading = creating || updating;

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        description: editingExpense.description || '',
        amount: editingExpense.amount ?? '',
        category: editingExpense.category || 'Ushqim',
        date: toInputDateValue(editingExpense.date || editingExpense.createdAt),
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount || !formData.category) {
      toast.error('Ju lutem plotësoni të gjitha fushat');
      return;
    }

    try {
      if (isEditing) {
        await updateExpense({
          id: editingExpense._id,
          ...formData,
          amount: Number(formData.amount),
        }).unwrap();
        toast.success('Shpenzimi u përditësua me sukses!');
      } else {
        await createExpense({
          ...formData,
          amount: Number(formData.amount),
        }).unwrap();
        toast.success('Shpenzimi u shtua me sukses!');
      }

      setFormData(emptyForm);
      onDone?.();
    } catch (error) {
      toast.error(
        error?.data?.message ||
          (isEditing ? 'Përditësimi i shpenzimit dështoi' : 'Shtimi i shpenzimit dështoi')
      );
    }
  };

  return (
    <section className="panel-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Formular</p>
          <h2>{isEditing ? 'Përditëso shpenzimin' : 'Shto shpenzim'}</h2>
        </div>

        {isEditing ? (
          <button className="btn btn-light" type="button" onClick={onCancelEdit}>
            Anulo
          </button>
        ) : null}
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label className="field">
            <span>Përshkrimi</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="p.sh. Dreka"
            />
          </label>

          <label className="field">
            <span>Shuma</span>
            <input
              type="number"
              name="amount"
              min="0"
              step="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="p.sh. 500"
            />
          </label>

          <label className="field">
            <span>Kategoria</span>
            <select name="category" value={formData.category} onChange={handleChange}>
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Data</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="btn btn-primary full-width" type="submit" disabled={isLoading}>
          {isLoading ? 'Duke u ruajtur...' : isEditing ? 'Përditëso' : 'Ruaj'}
        </button>
      </form>
    </section>
  );
};

export default ExpenseForm;
