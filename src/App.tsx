import { Layout } from './components/layout'
import './App.css'
import { useState } from 'react'
import ItemList from './components/itemList/ItemList';
import { useForm, Resolver } from 'react-hook-form';



type FormValues = {
  firstName: string;
  lastName: string;
};
interface todoList{
  title: string;
  message: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

function App() {
  const [todoList, setTodoList] = useState<todoList[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Layout>
      <main className='contApp'>
        <section className='contApp__List'>
          {todoList.map((item)=>{
            return <ItemList value={item.title}/>
          })}
        </section>
        <form onSubmit={onSubmit}>
          <input {...register("firstName")} placeholder="Bill" />
          {errors?.firstName && <p>{errors.firstName.message}</p>}
          
          <input {...register("lastName")} placeholder="Luo" />

          <input type="submit" />
        </form>
      </main>
    </Layout>
  )
}

export default App