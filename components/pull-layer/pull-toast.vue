<template>
  <view>
    <view class="pull-modal pull-plane flex-row" :class="show && 'active'">
      <view class="pull-plane-close"></view>
      <view class="pull-plane-content">
        <view class="pull-modal-box">
          <view class="pull-modal-title hide-text-1" v-if="title">{{title}}</view>
          <view class="partation"></view>
          <view class="pull-modal-content" v-if="content">{{content}}</view>
          <view class="flex-row">
            <button type="default" v-if="cancelText" size="mini" @click="cancel">{{cancelText}}</button>
            <button type="primary" v-if="confirmText" size="mini" @click="confirm">{{confirmText}}</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.pull-modal {
  justify-content: center;
  align-items: center;
}
.pull-modal .pull-plane-content {
  /* padding: 20upx; */
  border-radius: 10upx;
  width: 72%;
  overflow: hidden;
  transition: all 0.3s;
  transform: scale(0);
	margin-bottom: 100upx;
}
.pull-modal.active .pull-plane-content {
  transform: scale(1);
}
.pull-modal button {
  margin: 0;
  height: 88upx;
  line-height: 88upx;
  width: 100%;
  border-radius: 0;
  padding: 0;
  text-align: center;
  overflow: inherit;
}
.pull-modal button:after {
  display: none;
}
.pull-modal .pull-modal-title {
  height: 80upx;
  line-height: 80upx;
  text-align: center;
  font-size: 32upx;
  padding: 0 30upx;
}
.pull-modal .pull-modal-content {
  min-height: 100upx;
  font-size: 28upx;
  color: #666;
  padding: 20upx 30upx;
  box-sizing: border-box;
}
</style>
