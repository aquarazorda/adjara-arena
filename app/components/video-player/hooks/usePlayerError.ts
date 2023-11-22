const usePlayerError = () => {
  const sendError = (error: any, code = 400) => {
    let message: string = '';
    // @ts-ignore
    const _token = document.querySelector('#scrfToken') ? document.querySelector('#scrfToken')?.value : '';

    if (error.detail) {
      message = error.detail;
    } else {
      [0, 1, 2].forEach((item: number) => {
        message += `${error.data[item]} - `;
      });
    }

    fetch('/player-errors', {
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify({ message, code, _token }),
      method: 'POST',
    });
  };

  return [sendError];
};

export default usePlayerError;
