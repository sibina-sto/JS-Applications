import {
  getAll,
  createMovie,
  checkResult,
  getMovieById,
  editMovie,
  likeMovie,
  deleteMovie as apiDelete,
} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function home() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
    catalog: await this.load('./templates/catalog/catalog.hbs'),
    movie: await this.load('./templates/catalog/movie.hbs'),
  };

  const context = Object.assign({}, this.app.userData);
  if (this.app.userData.email) {
    const movies = await getAll();
    context.movies = movies;
  }

  this.partial('./templates/home.hbs', context);
}

export async function createPage() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  this.partial('./templates/catalog/create.hbs', this.app.userData);
}

export async function editPage() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  const movie = await getMovieById(this.params.id);
  const context = Object.assign({ movie }, this.app.userData);

  await this.partial('./templates/catalog/edit.hbs', context);
}

export async function detailsPage() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  const id = this.params.id;
  const movie = await getMovieById(id);
  const context = Object.assign({ movie }, this.app.userData);
  if (movie.ownerId === this.app.userData.userId) {
    movie.canEdit = true;
  }

  await this.partial('./templates/catalog/details.hbs', context);

  // const likeBtn = document.querySelector('#likeBtn');
  // likeBtn.addEventListener('click', async (x) => {
  //   x.preventDefault();
  //   try {
  //     const result = await likeMovie(id);
  //     checkResult(result);
  //     likeBtn.textContent = `${result.likes} likes`;
  //     showInfo('You liked that movie.');
  //   } catch (x) {
  //     showError(x.message);
  //   }
  // });
}

export async function like() {
  const id = this.params.id;
  try {
    const result = await likeMovie(id, this.app.userData.email);
    checkResult(result);
    showInfo('Liked successfully');
    this.redirect('/');
  } catch (x) {
    showError(x.message);
  }
}

export async function deleteMovie() {
  const id = this.params.id;
  try {
    const result = await apiDelete(id);
    checkResult(result);
    showInfo('Deleted successfully');
    this.redirect('/');
  } catch (x) {
    showError(x.message);
  }
}

export async function createPost() {
  let movie = {
    title: this.params.title,
    description: this.params.description,
    imageUrl: this.params.imageUrl,
    likes: 0,
  };

  try {
    if (movie.title.length < 1) {
      throw new Error('Invalid inputs!');
    }
    if (movie.description.length < 1) {
      throw new Error('Invalid inputs!');
    }
    if (movie.imageUrl.length < 1) {
      throw new Error('Invalid inputs!');
    }

    const result = await createMovie(movie);
    checkResult(result);

    showInfo('Created successfully!');
    this.redirect('/');
  } catch (x) {
    showError(x.message);
  }
}

export async function editPost() {
  const id = this.params.id;
  let movie = await getMovieById(id);

  movie.title = this.params.title;
  movie.description = this.params.description;
  movie.imageUrl = this.params.imageUrl;

  try {
    if (movie.title.length < 1) {
      throw new Error('Invalid inputs!');
    }
    if (movie.description.length < 1) {
      throw new Error('Invalid inputs!');
    }
    if (movie.imageUrl.length < 1) {
      throw new Error('Invalid inputs!');
    }

    const result = await editMovie(id, movie);
    checkResult(result);

    showInfo('Eddited successfully');
    this.redirect(`#/details/${id}`);
  } catch (x) {
    showError(x.message);
  }
}
