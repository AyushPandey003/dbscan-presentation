import plotly.graph_objects as go
import numpy as np

# Data from the provided JSON
epsilon_values = [0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5]
min_samples_values = [3, 5, 7, 10, 15, 20, 25, 30]
silhouette_scores_matrix = [
    [0.21, 0.45, 0.68, 0.72, 0.65, 0.58, 0.52, 0.46],
    [0.19, 0.52, 0.74, 0.78, 0.71, 0.63, 0.56, 0.49],
    [0.17, 0.48, 0.71, 0.75, 0.69, 0.61, 0.54, 0.47],
    [0.15, 0.44, 0.67, 0.73, 0.66, 0.58, 0.51, 0.44],
    [0.13, 0.39, 0.62, 0.68, 0.61, 0.54, 0.47, 0.41],
    [0.11, 0.35, 0.57, 0.63, 0.57, 0.50, 0.43, 0.37],
    [0.09, 0.31, 0.52, 0.58, 0.52, 0.45, 0.39, 0.33],
    [0.07, 0.27, 0.47, 0.53, 0.47, 0.41, 0.35, 0.29]
]

# Create text annotations matrix
text_matrix = []
for row in silhouette_scores_matrix:
    text_row = [f"{score:.2f}" for score in row]
    text_matrix.append(text_row)

# Create the heatmap
fig = go.Figure(data=go.Heatmap(
    z=silhouette_scores_matrix,
    x=epsilon_values,
    y=min_samples_values,
    text=text_matrix,
    texttemplate="%{text}",
    textfont={"size": 10},
    colorscale='Viridis',  # Light to dark colorscale
    colorbar=dict(
        title="Silhouette"
    ),
    hoverongaps=False
))

# Update layout with title and axis labels (keeping under character limits)
fig.update_layout(
    title="DBSCAN Param Sensitivity Heatmap",  # Under 40 chars
    xaxis_title="Epsilon",  # Under 15 chars
    yaxis_title="Min Samples"  # Under 15 chars
)

# Save the chart
fig.write_image("dbscan_heatmap.png")