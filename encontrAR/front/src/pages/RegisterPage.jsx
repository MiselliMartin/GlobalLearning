import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore.js'
import styles from '../styles/Login.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useStore((store) => store.user)
  const isLoading = useStore((store) => store.isLoading)
  const errorRegister = useStore((store) => store.error)
  const { register: registerRequest, setError } = useStore()
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
    const registered = await registerRequest(data);
    if (registered) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
    }
    else {
      const Toast2 = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      Toast2.fire({
        icon: "error",
        title: "Something has failed"
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre de usuario
            <input
              type="username"
              {...register('username', { required: true })}
              className={styles.input}
              autoComplete="username"
              placeholder={'GenioComoEinstein'}
            />
          </label>
          {errors.username && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email
            <input
              type="email"
              {...register('email', { required: true })}
              className={styles.input}
              autoComplete="email"
              placeholder={'example@gmail.com'}
            />
          </label>
          {errors.email && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre
            <input
              type="text"
              {...register('name', { required: true })}
              className={styles.input}
              placeholder={'Albert'}
            />
          </label>
          {errors.name && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Apellido
            <input
              type="text"
              {...register('lastname', { required: true })}
              className={styles.input}
              placeholder={'Einstein'}
            />
          </label>
          {errors.password && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contraseña
            <input
              type="password"
              {...register('password', { required: true })}
              className={styles.input}
              autoComplete="current-password"
              placeholder={'********'}
            />
          </label>
          {errors.password && <span className={styles.error}>Este campo es requerido</span>}
        </div>

        <button type="submit" className={styles.button}>Registrarse</button>
        {errorRegister ? (<div className={styles.error}>{errorRegister}</div>) : null}
        {isLoading ? (<div className={styles.loading}>Creating...</div>) : null}
      </form>
    </div>
  );
};

