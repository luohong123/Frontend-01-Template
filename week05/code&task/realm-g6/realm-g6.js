/*
 * @Author: qingcheng
 * @Date: 2020-05-14 09:30:58
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-14 09:54:01
 * @Description: 
 * @email: 3300536651@qq.com
 */

let categoryJson = {
    "id": "Modeling Methods",
    "children": [
      {
        "id": "Classification",
        "children": [
          { "id": "Logistic regression" },
          { "id": "Linear discriminant analysis" },
          { "id": "Rules" },
          { "id": "Decision trees" },
          { "id": "Naive Bayes" },
          { "id": "K nearest neighbor" },
          { "id": "Probabilistic neural network" },
          { "id": "Support vector machine" }
        ]
      },
      {
        "id": "Consensus",
        "children": [
          {
            "id": "Models diversity",
            "children": [
              { "id": "Different initializations" },
              { "id": "Different parameter choices" },
              { "id": "Different architectures" },
              { "id": "Different modeling methods" },
              { "id": "Different training sets" },
              { "id": "Different feature sets" }
            ]
          },
          {
            "id": "Methods",
            "children": [
              { "id": "Classifier selection" },
              { "id": "Classifier fusion" }
            ]
          },
          {
            "id": "Common",
            "children": [
              { "id": "Bagging" },
              { "id": "Boosting" },
              { "id": "AdaBoost" }
            ]
          }
        ]
      },
      {
        "id": "Regression",
        "children": [
          { "id": "Multiple linear regression" },
          { "id": "Partial least squares" },
          { "id": "Multi-layer feedforward neural network" },
          { "id": "General regression neural network" },
          { "id": "Support vector regression" }
        ]
      }
    ]
  };
// fetch('./algorithm-category.json')
//   .then(res => res.json())
//   .then(data => {
    let data = categoryJson;
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF',
        },
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.node(function(node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
//   });