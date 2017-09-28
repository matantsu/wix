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

let input = '';
export const Main = ({status,page,search,posts,next,prev}: any) => {
  const loading = status == 'Loading';
  return <div>
    <Segment vertical>
        <Container className="center aligned">
          <h3>
            <img src="https://www.file-extensions.org/imgs/app-icon/128/10395/wix-icon.png" alt=""/>
          </h3>
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
      
    <Segment vertical>
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
}