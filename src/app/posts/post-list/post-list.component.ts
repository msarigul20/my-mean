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

  posts: Post[] = [];
  private postsSub : Subscription;
  isShowAlert = false;
  isLoading = false;
  constructor(public postsService: PostsService){
  }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }) ;
  }
  onDelete(postId: string){
    this.isShowAlert = true;
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
