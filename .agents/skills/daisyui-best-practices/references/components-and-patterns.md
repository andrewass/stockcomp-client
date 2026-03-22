# Components and Patterns

Use these patterns as defaults for app-quality UI.

## Composition Rules

- Start with daisyUI semantic classes, then layer Tailwind layout utilities.
- Keep component structure simple and predictable.
- Use consistent spacing and surface tokens (`bg-base-*`, `border-base-*`).

## Core Patterns

### Button Actions

```tsx
<div className="flex gap-2">
  <button className="btn btn-primary">Save</button>
  <button className="btn btn-outline">Cancel</button>
  <button className="btn btn-ghost btn-sm">More</button>
</div>
```

### Card + Actions

```tsx
<div className="card bg-base-100 border border-base-200 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Project Snapshot</h2>
    <p className="text-base-content/70">Updated 2 minutes ago</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Open</button>
    </div>
  </div>
</div>
```

### Form + Validation Hint

```tsx
<form className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-sm p-4">
  <label className="label">Email</label>
  <input type="email" className="input validator" required placeholder="name@company.com" />
  <p className="validator-hint hidden">Required</p>

  <label className="label mt-3">Password</label>
  <input type="password" className="input validator" required placeholder="********" />
  <p className="validator-hint hidden">Required</p>

  <button className="btn btn-neutral mt-4" type="submit">Sign in</button>
</form>
```

### Table Wrapper

```tsx
<div className="overflow-x-auto rounded-box border border-base-200 bg-base-100">
  <table className="table table-sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
</div>
```

### Menu / Navigation

```tsx
<ul className="menu bg-base-200 rounded-box w-64">
  <li><a>Overview</a></li>
  <li><a>Items</a></li>
  <li><a>Reports</a></li>
  <li><a>Settings</a></li>
</ul>
```

### Drawer Shell

```tsx
<div className="drawer lg:drawer-open">
  <input id="app-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content p-4">{children}</div>
  <div className="drawer-side">
    <label htmlFor="app-drawer" className="drawer-overlay" />
    <ul className="menu p-4 w-80 bg-base-200 min-h-full">
      <li><a>Dashboard</a></li>
      <li><a>Analytics</a></li>
      <li><a>Settings</a></li>
    </ul>
  </div>
</div>
```

### Alert + Badge + Stats

```tsx
<div className="alert alert-info"><span>Background sync is delayed.</span></div>
<span className="badge badge-success">Connected</span>
<div className="stats shadow mt-3">
  <div className="stat">
    <div className="stat-title">Weekly Growth</div>
    <div className="stat-value text-success">+2.1%</div>
  </div>
</div>
```

### Modal

```tsx
<dialog id="confirm-delete" className="modal">
  <div className="modal-box">
    <h3 className="font-semibold text-lg">Delete item?</h3>
    <p className="py-2 text-base-content/70">This action cannot be undone.</p>
    <div className="modal-action">
      <form method="dialog" className="flex gap-2">
        <button className="btn">Cancel</button>
        <button className="btn btn-error">Delete</button>
      </form>
    </div>
  </div>
</dialog>
```

## Accessibility Checks

- Every input has a visible label.
- Use semantic controls (`button`, `a`, `input`, `dialog`).
- Keep keyboard focus visible.
- Do not rely on color alone for meaning.
