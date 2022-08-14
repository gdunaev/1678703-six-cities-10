// import {music, system, name, internet} from 'faker';
// import {GameType} from '../const';
// import {GameType} from '../const';
// import {QuestionArtist} from '../types/question';
// import {QuestionArtist, QuestionGenre} from '../types/question';


// export const makeFakeArtistQuestion = (): QuestionArtist => ({
// export const makeFakeArtistQuestion = (): QuestionArtist => ({
//   type: GameType.Artist,
//   type: GameType.Artist,
// @@ -12,3 +12,11 @@ export const makeFakeArtistQuestion = (): QuestionArtist => ({
//     { picture: internet.avatar(), artist: name.title() }
//     { picture: internet.avatar(), artist: name.title() }
//   )),
//   )),
// } as QuestionArtist);
// } as QuestionArtist);

// export const makeFakeGenreQuestion = (): QuestionGenre => ({
//   type: GameType.Genre,
//   genre: music.genre(),
//   answers: new Array(4).fill(null).map(() => (
//     { src: system.filePath(), genre: music.genre() }),
//   ),
// } as QuestionGenre);
export {};
