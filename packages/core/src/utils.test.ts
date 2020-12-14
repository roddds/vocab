import {
  getDevLanguageFileFromTsFile,
  getAltLanguageFilePath,
  getTSFileFromDevLanguageFile,
} from './utils';

describe('getDevLanguageFileFromTsFile', () => {
  it('should find a translation.json file', () => {
    expect(
      getDevLanguageFileFromTsFile('/my/awesome/translations.ts', {
        translationsDirname: 'monkeys',
      }),
    ).toBe('/my/awesome/monkeys/translations.json');
  });
  it('should support using namespace prefix', () => {
    expect(
      getDevLanguageFileFromTsFile('/my/awesome/client.translations.ts', {
        translationsDirname: 'monkeys',
      }),
    ).toBe('/my/awesome/monkeys/client.translations.json');
  });
});

describe('getAltLanguageFilePath', () => {
  it('should find a translation.json file', () => {
    expect(getAltLanguageFilePath('/my/awesome/translations.json', 'fr')).toBe(
      '/my/awesome/translations.fr.json',
    );
  });
  it('should support using namespace prefix', () => {
    expect(
      getAltLanguageFilePath('/my/awesome/client.translations.json', 'fr'),
    ).toBe('/my/awesome/client.translations.fr.json');
  });
});

describe('getTSFileFromDevLanguageFile', () => {
  it('should be good', () => {
    expect(
      getTSFileFromDevLanguageFile(
        '/my/awesome/__translations__/client.translations.json',
      ),
    ).toBe('/my/awesome/client.translations.ts');
  });
});