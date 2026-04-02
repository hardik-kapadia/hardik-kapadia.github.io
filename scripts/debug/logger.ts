const PREFIX = "[portfolio]";

const formatContext = (context?: unknown) => {
  if (context === undefined) {
    return undefined;
  }

  return context;
};

const normalizeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return error;
};

export const logInfo = (message: string, context?: unknown) => {
  const formatted = formatContext(context);

  if (formatted === undefined) {
    console.log(PREFIX, message);
    return;
  }

  console.log(PREFIX, message, formatted);
};

export const logWarn = (message: string, context?: unknown) => {
  const formatted = formatContext(context);

  if (formatted === undefined) {
    console.warn(PREFIX, message);
    return;
  }

  console.warn(PREFIX, message, formatted);
};

export const logError = (message: string, error?: unknown, context?: unknown) => {
  const normalizedError = normalizeError(error);
  const formattedContext = formatContext(context);

  if (formattedContext === undefined) {
    console.error(PREFIX, message, normalizedError);
    return;
  }

  console.error(PREFIX, message, normalizedError, formattedContext);
};

export const installGlobalErrorLogging = () => {
  window.addEventListener("error", (event) => {
    logError("window:error", event.error ?? event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logError("window:unhandledrejection", event.reason);
  });
};
