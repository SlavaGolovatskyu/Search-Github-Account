import React from 'react';
import axios from 'axios';
import { useDebounce } from '../debounce';
import styles from '../App.module.scss';

export const FindUser = ({ setUserData }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const debouncedSearchUser = useDebounce(inputValue, 500);

  const searchUser = async () => {
    const url = `https://api.github.com/users/${inputValue}`;
    setIsLoading(true);

    try {
      const { data } = await axios.get(url);
      setUserData({ ...data, notFound: false });
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setUserData({ notFound: true });
      } else {
        alert(e);
      }
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (debouncedSearchUser) {
      if (!isLoading) searchUser();
    }
  }, [debouncedSearchUser]);

  return (
    <div className={styles.AppForm}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Укажите GitHub-аккаунт"
        className={styles.seacrh}
      />
    </div>
  );
};
