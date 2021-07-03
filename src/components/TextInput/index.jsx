import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <input 
          type="search" 
          className="text-input"
          value={searchValue}
          onChange={handleChange}
          placeholder="Procure pelo Post"
        />
    )
}