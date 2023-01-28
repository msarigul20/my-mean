import { Component, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../post.service';
import { Subscription } from "rxjs";
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  /*posts = [
     { title: 'First Post', content: 'First Content' },
     { title: 'Second Post', content: 'Second Content' },
     { title: 'Third Post', content: 'Third Content' },
  ]*/

  posts: Post[] = [];
  private postsSub : Subscription;

  constructor(public postsService: PostsService){
  }

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      }) ;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
