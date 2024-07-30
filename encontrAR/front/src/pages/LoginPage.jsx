import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore.js'
import styles from '../styles/Login.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useStore((store) => store.user)
  const isLoading = useStore((store) => store.isLoading)
  const errorLogin = useStore((store) => store.error)
  const { login, setError } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }

    return (
      setError(null)
    )

  }, [user])


  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className={styles.input}
            autoComplete="email"
            placeholder={'example@gmail.com'}
          />
          {errors.email && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className={styles.input}
            autoComplete="current-password"
            placeholder={'********'}
          />
          {errors.password && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <button type="submit" className={styles.button}>Iniciar Sesión</button>
        {errorLogin ? (<div className={styles.error}>{errorLogin}</div>) : null}
        {isLoading ? (<div className={styles.loading}>Verifying...</div>) : null}
      </form>
    </div>
  );
};

