import * as React from "react";
import { Segment,Container,Input,Button,Image } from 'semantic-ui-react';
import {Post,pageSize,maxPage} from './store'

type GalleryProps =
  {
    posts: Post[],
    page: number,
    prevAvailable: boolean,
    prev: () => any,
    nextAvailable: boolean,
    next: () => any,
  }

export const Gallery = ({prevAvailable,nextAvailable,posts,prev,next,page} : GalleryProps) =>
  <div>
    <Button 
      icon='arrow left' 
      content='prev' 
      labelPosition='left'
      disabled={!prevAvailable}
      onClick={prev}/>
    &nbsp;
    &nbsp;
    page {page+1} of {maxPage(posts.length)+1}
    &nbsp;
    &nbsp;
    <Button
      icon='arrow right' 
      content='next'
      labelPosition='right'
      disabled={!nextAvailable}
      onClick={next}/>
    <br/>
    <br/>
    <Image.Group fluid size='medium'>
      {posts.slice(page*pageSize,(page+1)*pageSize).map((post,index) => {
        return (
          <Image
            key={index}
            title={post.title}
            href={post.url}
            target="_blank"
            src={post.image} 
            bordered
            shape='rounded'
          />
      )})
      }
    </Image.Group>
  </div>

type HeadProps = 
  {
    loading: boolean,
    search: (term: string) => any
  }

let input = '';
export const Head = ({loading,search} : HeadProps) => 
  <Segment vertical>
      <Container className="center aligned">
        <Input 
          disabled={loading} 
          placeholder="Type a subreddit ..."
          onChange={e => input = e.currentTarget.value}
          />
        <Button labeled
          onClick={() => search(input)}
          loading={loading} 
          disabled={loading} 
          attached='right'
          icon='search'
          content='search'/>
      </Container>
  </Segment>

export const Main = ({status,page,search,posts,next,prev}: any) =>
  <div>
    <Head 
      loading={status == 'Loading'} 
      search={search}/>

    <Segment vertical loading={status == 'loading'}>
      <Container className="center aligned">
        {status == 'Error' &&
          <Segment inverted color='red' secondary>
            An error has occured
          </Segment>
        }
        {status == 'Empty' &&
          'No posts'
        }
        {status == 'Normal' &&
          <Gallery
            posts={posts}
            page={page}
            prevAvailable={page > 0}
            next={next}
            nextAvailable={page < maxPage(posts.length)}
            prev={prev}
          />
        }
      </Container>
    </Segment>
  </div>