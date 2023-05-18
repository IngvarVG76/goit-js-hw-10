import Notiflix from 'notiflix';

export const errorType = {
  toMany: 'Too many matches found. Please enter a more specific name',
  notFound: 'Oops, there is no country with that name',
  emptyField: 'Fill valid name',
};

export function errorHandler(error) {
  if (error.message === "404") {
    Notiflix.Notify.failure(errorType.notFound);
  } else if (error.message === errorType.toMany) {
    Notiflix.Notify.info(errorType.toMany);
  } else {Notiflix.Notify.failure("Shit happens :( " + error.message);}
}
