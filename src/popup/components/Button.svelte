<script lang="ts">
  export let onClick: EventListener;
  export let disabled = false;
</script>

<button
  type="button"
  on:click={onClick}
  disabled={disabled}
>
  <slot></slot>
</button>

<style>
  button {
    transition: all 0.2s ease;
    border-radius: 100px;
    background-color: var(--BX00);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 35px;
    padding: 0 25px;
    user-select: none;
    white-space: nowrap;
  }

  button:hover {
    background: var(--BX10);
  }

  button:disabled {
    background-color: var(--D50);
    pointer-events: none;
  }
</style>
