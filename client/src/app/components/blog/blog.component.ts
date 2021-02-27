import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/BlogPost';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[];
  postToAdd = {
    title: '',
    author: 'Sam',
    body: '',
  };

  constructor(private httpService: HTTPService) {}

  ngOnInit(): void {
    // Fetch existing blog posts
    this.httpService.getBlogPosts().subscribe((res) => {
      this.blogPosts = res;
      console.log(this.blogPosts);
    });
  }

  addPost() {
    // Add new blog post
    this.httpService.addBlogPost(this.postToAdd).subscribe((res) => {
      let addedBlogPost: BlogPost = {
        _id: res['_id'],
        title: res['title'],
        author: res['author'],
        body: res['body'],
      };
      // Display newly added post on screen
      this.blogPosts.push(addedBlogPost);
    });
  }
}
