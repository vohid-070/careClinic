<template>
  <div class="flex justify-content-center">
    <div class="content">
      <div class="card-header text-center">
        <slot name="header">
          <img class="w-14rem" alt="logo" src="@/../public/logo.png" />
        </slot>
      </div>
      <Divider />
      <div class="card-body"><slot name="body">Card body</slot></div>
      <div class="card-footer flex justify-content-center p-2 mt-3">
        <slot name="footer">Спасибо за ожидание!</slot>
      </div>
    </div>
  </div>
</template>

<style>
.content {
  position: relative;
  font-size: 20px;
  width: 550px;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid black;
  background-color: white;
  color: black;
  margin: 12px 0;
  box-shadow: 0 1em 1em rgba(0, 0, 0, 0.1), 0 0 0 1px rgb(255, 255, 255),
    0.2em 0.3em 1em rgba(0, 0, 0, 0.1);
}

.content:after {
  content: "";
  position: absolute;
  display: block;
  height: 10px;
  bottom: -10px;
  /* -height */
  left: 0;
  right: 0;
  /* TODO Add browser prefixes */
  background: linear-gradient(
      45deg,
      transparent 33.333%,
      #ffffff 33.333%,
      #ffffff 66.667%,
      transparent 66.667%
    ),
    linear-gradient(
      -45deg,
      transparent 33.333%,
      #ffffff 33.333%,
      #ffffff 66.667%,
      transparent 66.667%
    );
  background-size: 12px 19px;
  /* toothSize doubleHeight */
  background-position: 0 -10px;
  /* horizontalOffset -height */
}
.content:before {
  content: "";
  position: absolute;
  display: block;
  height: 10px;
  bottom: -10px;
  /* -height */
  left: 0;
  right: 0;
  top: -10px;
  /* TODO Add browser prefixes */
  background: linear-gradient(
      45deg,
      transparent 33.333%,
      #ffffff 33.333%,
      #ffffff 66.667%,
      transparent 66.667%
    ),
    linear-gradient(
      -45deg,
      transparent 33.333%,
      #ffffff 33.333%,
      #ffffff 66.667%,
      transparent 66.667%
    );
  background-size: 12px 19px;
  /* toothSize doubleHeight */
  background-position: 0 20px;
  /* horizontalOffset -height */
}
.card-footer {
  background-color: black;
  color: white;
  font-size: 28px;
  font-weight: bolder;
}
.card-body p {
  line-height: 12px;
  font-size: 18px;
}
</style>
