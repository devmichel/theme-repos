import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state

    const postsAndPhotos = await loadPosts()  

    this.setState({ 
      allPosts: postsAndPhotos,
      posts: postsAndPhotos.slice(page, postsPerPage)
     })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      posts,
      allPosts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    
    posts.push(...nextPosts)

    this.setState({posts , page: nextPage});
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() { 
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? 
      allPosts.filter( post => post.title.toLowerCase().includes(searchValue.toLowerCase()) ) 
      : 
      posts;

    return (
      <section className="container">

        <div className="search-container">
          {!!searchValue && (
              <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        
        {filteredPosts.length > 0 &&(
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 &&(
          <p>Não tem esse post =X</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button 
              text="Ver mais Produtos"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
