import prettier from 'prettier/standalone';

export function formatJson(jsonString: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const formattedJson = prettier.format(jsonString, { parser: 'json' });
      resolve(formattedJson);
    } catch (error) {
      console.error('Error formatting JSON:', error);
      reject('Error formatting JSON');
    }
  });
}
