import axios from 'axios';
import { environment } from '../../environments/environment';
import { IPost } from '../interfaces/IPost';
import { AuthService } from './Auth.service';

export class PostService {
  static baseUrl = environment.apiUrl;

  static async getPosts(): Promise<IPost[]> {
    const { data } = await axios.get<{ result: IPost[] }>(
      `${PostService.baseUrl}/post`
    );

    return data.result;
  }

  static async createPost(payload: {
    content: string;
    title: string;
  }): Promise<any> {
    const headers = {
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    };

    const { data } = await axios.post(`${this.baseUrl}/post`, payload, {
      headers,
    });
  }

  static async createComment(
    payload: { text: string },
    postId: string
  ): Promise<any> {
    const headers = {
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    };

    const { data } = await axios.post(
      `${this.baseUrl}/post/${postId}/comment`,
      payload,
      {
        headers,
      }
    );
  }
}
