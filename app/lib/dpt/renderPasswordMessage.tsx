export default function RenderPasswordMessage(message: string | null): JSX.Element {
  return message !== null ? (
      <p className="text-xs text-error mt-1">
        <span role="img" aria-label="Cross Mark">
          ❌
        </span>{" "}
        {message}
      </p>
    ) : (
      <p className="text-xs text-success mt-1">
        <span role="img" aria-label="Check Mark">
            ✓
        </span>{" "}
        Password meets the criteria.
      </p>
    );
}
