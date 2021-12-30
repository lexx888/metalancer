<template>
    <div class="page">
        <div class="content">
            <h1>Metaverse/GameFi Large Caps (USDT)</h1>

            <div class="main-container">
  <div class="cards">
    <div class="card card-1">
     <div class="card__icon">30%</div>
      <h2 class="card__title">The Sandbox<br/>(m.SAND) </h2>
      <p class="card__apply">
        <a class="card__link" href="#">Buy now<i class="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div class="card card-2">
      <div class="card__icon">25%</div>

      <h2 class="card__title">Decentraland<br/>(m.MANA)</h2>
      <p class="card__apply">
        <a class="card__link" href="#">Buy now<i class="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div class="card card-3">
      <div class="card__icon">15%</div>
      <h2 class="card__title">Axie infinity<br/>(m.AXS)</h2>
      <p class="card__apply">
        <a class="card__link" href="#">Buy now<i class="fas fa-arrow-right"></i></a>
      </p>
    </div>
  </div>
</div>
<br/><br/>
<table > 
    <tr >
        <td style="padding-right: 20px"><b>Segment</b>: Metaverse/GameFi </td>
        <td style="padding-right: 20px"><b>Cash asset</b>: 30% (m.USDT) </td>
        <td style="padding-right: 20px">3 Months Return:&nbsp;<b style="background-color:#499419">+0.26%</b></td>
    </tr>
    <tr>
        <td style="padding-right: 20px"> <b>Category</b>: Large caps </td>
        <td style="padding-right: 20px"><b>TVL </b>: $5.5 mln </td>
        <td style="padding-right: 20px">6 Months Return: <b style="background-color:#499419">+9.89%</b> </td>

    </tr>


</table>
<br/><br/>

<div class="button-container">
    <div class="div1">
        <button class="invest  connect-button account" data-v-015de462="" data-v-6d0444a6="" data-v-61dd7a3d=""><i class="fas fa-coins"></i> Invest</button>
    </div>
    <div class="div2">
        <button class="withdraw  connect-button account" data-v-015de462="" data-v-6d0444a6="" data-v-61dd7a3d=""><i class="fas fa-share-square"></i> Withdraw</button>
    </div>
</div>

<br/><br/>
<br/><br/>
            <div class="tabset">
                <!-- Tab 1 -->
                <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked />
                <label for="tab1">About</label>
                <!-- Tab 2 -->
                <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                <label for="tab2">Assets</label>
                <!-- Tab 3 -->
                <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
                <label for="tab3">Management</label>

                <div class="tab-panels">
                    <section id="marzen" class="tab-panel">
                        <h2>Metaverse/GameFi Large Caps (USDT) Fund</h2>
                        <p>
                            <strong>Strategy</strong>: This fund offers exposure to the two most rapidly developing and interrelated blockchain industries - Metaverse and GameFi. 
                        </p>

<p>Metaverse enables the synergy of our digital and physical lives in wealth, socialization, productivity, shopping and entertainment.</p>
<p>GameFi is the combination of video games (Gaming) and decentralized finance (DeFi). The technology used for this type of video game is blockchain technology, which allows players to be the sole and verified owners of the virtual elements of the game.</p>

                    
                                 
                    </section>
                    <section id="rauchbier" class="tab-panel">
                        <h2>Portfolio Assets</h2>
                            <p><strong><a href="https://www.sandbox.game" targe="_blank" style="text-decoration: underline; color: white">The Sandbox (m.SAND)</a>:</strong> The Sandboxis a community-driven platform where creators can monetize voxel ASSETS and gaming experiences on the blockchain.</p>
                            <p><strong><a href="https://decentraland.org/" targe="_blank" style="text-decoration: underline; color: white">Decentraland (m.MANA)</a>:</strong> Decentraland (MANA) is a decentralized 3D virtual reality platform powered by the Ethereum blockchain where users can create virtual structures such as casinos, art galleries, concert halls and theme parks, and charge other players to visit them.</p>
                            <p><strong><a href="https://axieinfinity.com/" targe="_blank" style="text-decoration: underline; color: white">Axie infinity (m.AXS)</a>:</strong> Axie Infinity is a Pokémon-inspired universe where anyone can earn tokens through skilled gameplay and contributions to the ecosystem. Players can battle, collect, raise, and build a land-based kingdom for their pets. </p>

                    </section>
                    <section id="dunkles" class="tab-panel">
                        <h2>Portfolio adjustments</h2>
                        <p>
                            <strong>Adjustment schedule:</strong>  each 6 months (next date 30.06.2022)
                        </p>
                        <p>
                            <strong>What is it?</strong> Portfolio adjustment is a community-driven process in which investors in the portfolio can vote to adjust allocation (weights), include or exclude assets in the portfolio.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as charts from '../pages/chart.min.js'

export default defineComponent({
});
</script>
<style scoped>


.button-container,
.div1,
.div2 {
}

.div1,
.div2 {
  float: left;
}


button.withdraw {
    background: linear-gradient(to left, #b3c004, #a80dad);
    color: #fff;
}
button.invest {
    background: linear-gradient(to left, #04c097, #82ad0d);
    color: #fff;
}

.heading__title {
  font-weight: 600;
}

.heading__credits {
  margin: 10px 0px;
  color: #888888;
  font-size: 25px;
  transition: all 0.5s;
}

.heading__link {
  text-decoration: none;
}

.heading__credits .heading__link {
  color: inherit;
}

/* CARDS */

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  margin: 0px;
  padding: 20px;
  width: 300px;
  min-height: 200px;
  display: grid;
  grid-template-rows: 2px 5px 1fr 5px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.01);
}

.card__link,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

.card__link::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}

.card__link:hover::after {
  width: 100%;
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 15px;
  color: #f1f1f1;

}

.card__title {
  grid-row: 3/4;
  font-weight: 400;
  color: #ffffff;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}

/* CARD BACKGROUNDS */

.card-1 {
  background: radial-gradient(#1fe4f5, #3fbafe);
}

.card-2 {
  background: radial-gradient(#fbc1cc, #fa99b2);
}

.card-3 {
  background: radial-gradient(#76b2fe, #b69efe);
}

.card-4 {
  background: radial-gradient(#60efbc, #58d5c9);
}

.card-5 {
  background: radial-gradient(#f588d8, #c0a3e5);
}

/*
 CSS for the main interaction
*/
.tabset > input[type="radio"] {
    position: absolute;
    left: -200vw;
}

.tabset .tab-panel {
    display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
    display: block;
}

.tabset > label {
    position: relative;
    display: inline-block;
    padding: 15px 15px 25px;
    border: 1px solid transparent;
    border-bottom: 0;
    cursor: pointer;
    font-weight: 600;
}

.tabset > label::after {
    content: "";
    position: absolute;
    left: 15px;
    bottom: 10px;
    width: 22px;
    height: 4px;
    background: #8d8d8d;
}

.tabset > label:hover,
.tabset > input:focus + label {
    color: #06c;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
    background: #06c;
}

.tabset > input:checked + label {
    border-color: #ccc;
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;
}

.tab-panel {
    padding: 30px 0;
    border-top: 1px solid #ccc;
}

/*
 Demo purposes only
*/
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    padding: 30px;
}

.tabset {
    max-width: 65em;
}
.page {
    flex: 1;
}

.content {
    position: relative;
    max-width: 980px;
    margin: 0 auto;
    padding: 16px;
}
</style>
