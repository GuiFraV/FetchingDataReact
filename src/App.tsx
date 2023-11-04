import { useEffect, useState } from 'react'

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

interface Post {
  id:number;
  title: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  
  useEffect(() => {
    const fetchPosts = async () => {

      setIsLoading(true);

      try{
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = await response.json() as Post[];
        setPosts(posts);
      }catch (e: any){
        setError(e);
      }


      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Something went wrong ! Please try again</div>
  }

  return (

    <div className='tutorial'>
      <h1 className='mb-4 text-2xl'> Data Fetching in React</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>
        })}
      </ul>
    </div>
   
  )
}

export default App
