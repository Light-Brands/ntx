# Component Catalog

**UI component reference for {BRAND_NAME}**

## Overview

This catalog documents all UI components, their variants, and usage guidelines.

## Primitives

### Button

Interactive element for triggering actions.

**Variants:**
| Variant | Usage |
|---------|-------|
| primary | Main CTAs |
| secondary | Secondary actions |
| ghost | Tertiary actions |
| destructive | Dangerous actions |

**Sizes:** `sm`, `md`, `lg`

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Usage:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="ghost" leftIcon={<PlusIcon />}>
  Add Item
</Button>
```

---

### Input

Text input for form data.

**Variants:**
| Variant | Usage |
|---------|-------|
| default | Standard input |
| error | Validation error state |

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
```

**Usage:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="name@example.com"
  error={errors.email}
/>
```

---

## Patterns

### Card

Container for grouped content.

**Anatomy:**
```
┌─────────────────────────┐
│ Header (optional)       │
├─────────────────────────┤
│ Body                    │
│ - Content goes here     │
├─────────────────────────┤
│ Footer (optional)       │
└─────────────────────────┘
```

**Usage:**
```tsx
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Body>
    Content here
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

### Modal

Overlay dialog for focused interactions.

**Props:**
```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>
```

---

## Feature Components

### ProfileCard
User profile display component.

### MessageBubble
Chat message display.

### NotificationItem
Notification list item.

---

## Component Status

| Component | Status | Notes |
|-----------|--------|-------|
| Button | ✅ Stable | - |
| Input | ✅ Stable | - |
| Card | ✅ Stable | - |
| Modal | ✅ Stable | - |
| Dropdown | 🚧 Beta | Accessibility review needed |
| DatePicker | 📋 Planned | Q1 |

---

*Template from Onyx Design System*
