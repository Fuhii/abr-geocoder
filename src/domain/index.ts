/**
 * Clean Architectureに基づく分類。
 * ソフトウェア全体を支える コア機能
 *
 * データエンティ、および、横断的に使用する関数など。
 * 基本的にクラスや機能そのものが他のクラスなどから独立していて、
 * 単体では何も出来ない機能を配置する。
 *
 */
export * from './AbrgError';
export * from './AbrgMessage';
export * from './RegExpEx';
export * from './dataset';
export * from './fsIterator';
export * from './getDataDir';
export * from './isKanjiNumberFollewedByCho';
export * from './jisKanji';
export * from './query.class';
export * from './saveArchiveMeta';
export * from './types';
export * from './unzipArchive';
export * from './GeocodeResult.class';
export * from './kan2num';
